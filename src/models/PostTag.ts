import {DataTypes, Model} from 'sequelize';
import {database} from '../config/database.js';


interface PostTagAttributes {
    post_id: number;
    tag_id: number;
}

class PostTag extends Model<PostTagAttributes> implements PostTagAttributes {
    declare post_id: number;
    declare tag_id: number;
}

PostTag.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'posts_tags',
        timestamps: false,
    }
);

export {PostTag};
