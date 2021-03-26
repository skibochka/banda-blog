import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBlackList1616743760168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('BlackList');
  }
}
