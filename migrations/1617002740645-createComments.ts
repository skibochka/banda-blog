import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class createComments1617002740645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'userID',
          type: 'int',
        },
        {
          name: 'postId',
          type: 'int',
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

    await queryRunner.createForeignKey('comments', new TableForeignKey({
      columnNames: ['postId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Comments');
  }
}
