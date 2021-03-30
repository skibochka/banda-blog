import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class createCommentLikes1617003365415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comment_likes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'userId',
          type: 'int',
        },
        {
          name: 'commentId',
          type: 'int',
        },
      ],
    }), true);

    await queryRunner.createForeignKey('comment_likes', new TableForeignKey({
      columnNames: ['commentId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
    }));
    await queryRunner.createForeignKey('comment_likes', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment_likes');
  }
}
