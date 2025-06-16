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

    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3
        }
    },

    {
        tableName:'users',
        timestamps:true
    }
    
)


