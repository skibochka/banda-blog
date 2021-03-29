import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class createCommentLikes1617003365415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'comment_likes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'userID',
          type: 'int',
        },
        {
          name: 'commentId',
          type: 'int',
        },
      ],
    }), true);

    await queryRunner.createForeignKey('comment_likes', new TableForeignKey({
      columnNames: ['postId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment_likes');
  }
}
