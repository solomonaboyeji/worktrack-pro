import {  Sequelize , Model} from "sequelize/types";

import { DataType } from "sequelize-typescript";

const _task = function (sequelize: any) {
  return sequelize.define(
    "task",
    {
      taskId: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      refNumber: {
        type: DataType.INTEGER,
        allowNull: false
      },
      description: {
        type: DataType.TEXT,
        allowNull: false
      },
      minAge: {
        type: DataType.INTEGER,
        allowNull: false
      },
      amountPerHour: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "task",
      timestamps: true,
      indexes: [
        {
          name: "task_pkey",
          unique: true,
          fields: [{ name: "taskId" }],
        },
      ],
    }
  );
};


export { _task }