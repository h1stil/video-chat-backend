import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique number' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'dfj@mail.com', description: 'Unique EMail' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'Mike', description: 'Name' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '*******', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'false', description: 'Is a user banned' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: ' ', description: 'The reason of ban' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  banReason: string;

  @ApiProperty({ example: 'Avatar', description: 'File or url???' }) //TODO: decide
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  avatar: string;

  @ApiProperty({ example: 'Admin', description: 'Role: Admin or User' })
  @Column({
    type: DataType.STRING,
    defaultValue: 'User',
  })
  role: string;
}
