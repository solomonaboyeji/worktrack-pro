import {  Sequelize , Model} from "sequelize/types";

import { DataType } from "sequelize-typescript";

const _taskskill = function (sequelize: any) {
  return sequelize.define(
    "taskskill",
    {
      taskSkillId: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      skillId: {
        type: DataType.STRING(255),
        allowNull: false,
      },
      taskId: {
        type: DataType.UUID,
        allowNull: false,
        references: {
          model: "task",
          key: "taskId",
        },
      },
      skillName: {
        type: DataType.TEXT,
        allowNull: false
      },
  
    },
    {
      sequelize,
      tableName: "taskskill",
      timestamps: true,
      indexes: [
        {
          name: "taskskill_pkey",
          unique: true,
          fields: [{ name: "taskskillId" }],
        },
      ],
    }
  );
};


export { _taskskill }