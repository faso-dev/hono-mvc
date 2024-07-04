import {DataTypes, Model, Optional} from 'sequelize';
import {database} from '../config/database.js';


interface TagAttributes {
    id: number;
    name: string;
    slug: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
    declare id: number;
    declare name: string;
    declare slug: string;
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Tag.init(
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
        tableName: 'tags',
    }
);

export {Tag};
