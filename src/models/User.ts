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

//
//Relaction whith Role
User.hasOne(Role, {
    foreignKey: 'userId',       
    as: 'role',                 
    onDelete: 'CASCADE', 
          
});

Role.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});