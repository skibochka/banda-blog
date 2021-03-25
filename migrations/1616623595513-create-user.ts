import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1616623595513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'Users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'isAdmin',
          type: 'boolean',
        },
        {
          name: 'login',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }), true);

    queryRunner.createTable(new Table({
      name: 'BlackList',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'token',
          type: 'varchar',
          isUnique: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Users');
    queryRunner.dropTable('BlackList');
  }
}
