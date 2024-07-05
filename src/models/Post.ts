import {DataTypes, Model, Optional} from 'sequelize';
import {database} from '../config/database.js';
import {Category} from "./Category.js";
import {PostTag} from "./PostTag.js";
import {Tag} from "./Tag.js";


interface PostAttributes {
    id: number;
    title: string;
    content: string;
    slug: string;
    published_at?: Date;
    excerpt?: string;
    category_id: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    declare id: number;
    declare title: string;
    declare content: string;
    declare slug: string;
    declare published_at?: Date;
    declare excerpt?: string;
    declare category_id: number;
    
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        published_at: {
            type: DataTypes.DATE,
        },
        excerpt: {
            type: DataTypes.TEXT,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'posts',
    }
);
Post.belongsTo(Category, {foreignKey: 'category_id', as: 'category'})
Post.belongsToMany(Tag, {through: PostTag, foreignKey: 'post_id', as: 'tags', otherKey: 'tag_id'})
export {Post};
