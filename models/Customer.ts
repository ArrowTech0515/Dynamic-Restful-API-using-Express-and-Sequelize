import { Sequelize, DataTypes } from 'sequelize';

const CustomerModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return sequelize.define('Customer', {
    first_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });
};

export default CustomerModel;
