import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Role } from "./Role";

export const User = sequelize.define('user',{
    id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
       },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        
        
    }},
    {
        tableName:'users',
        timestamps:true
    }
    
)


User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role',

});