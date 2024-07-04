import { DataTypes, Model, Optional } from 'sequelize';
import {database} from '../config/database.js';

interface CategoryAttributes {
    id: number;
    name: string;
    slug: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    declare id: number;
    declare name: string;
    declare slug: string;
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: database,
        tableName: 'categories',
    }
);

export {Category};
