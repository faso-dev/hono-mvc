class DatabaseCleaner {
    private tableOrder: string[] = [];
    private _database: any
    
    constructor(database: any) {
        this._database = database;
    }
    async clean() {
        try {
            await this.determineDeletionOrder();
            for (const table of this.tableOrder) {
                await this.clearTable(table);
            }
            console.log('All tables cleared successfully.');
        } catch (error) {
            console.error('Error clearing tables:', error);
        }
    }
    
    private async determineDeletionOrder() {
        const tables = await this.getAllTables();
        const dependencies = await this.getTableDependencies();
        
        // Algorithme de tri topologique pour déterminer l'ordre de suppression
        const visited = new Set<string>();
        const temp = new Set<string>();
        
        const visit = (table: string) => {
            if (temp.has(table)) {
                throw new Error("Circular dependency detected");
            }
            if (!visited.has(table)) {
                temp.add(table);
                for (const dep of dependencies[table] || []) {
                    visit(dep);
                }
                temp.delete(table);
                visited.add(table);
                this.tableOrder.unshift(table);
            }
        };
        
        for (const table of tables) {
            if (!visited.has(table)) {
                visit(table);
            }
        }
    }
    
    private async getAllTables(): Promise<string[]> {
        const [rows] = await this._database.query(`
            SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
        `);
        return rows.map((row: any) => row.name);
    }
    
    private async getTableDependencies(): Promise<Record<string, string[]>> {
        const [rows] = await this._database.query(`
            SELECT m.name as table_name,
                   p."table" as parent_table
            FROM sqlite_master m
            LEFT JOIN pragma_foreign_key_list(m.name) p ON m.name != p."table"
            WHERE m.type = 'table'
        `);
        
        const dependencies: Record<string, string[]> = {};
        for (const row of rows) {
            if (row.parent_table) {
                if (!dependencies[row.table_name]) {
                    dependencies[row.table_name] = [];
                }
                dependencies[row.table_name].push(row.parent_table);
            }
        }
        
        return dependencies;
    }
    
    private async clearTable(tableName: string) {
        try {
            await this._database.query(`DELETE FROM ${tableName}`);
            console.log(`Table ${tableName} cleared.`);
        } catch (error) {
            console.error(`Error clearing table ${tableName}:`, error);
        }
    }
}

export {DatabaseCleaner}
