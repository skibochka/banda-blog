import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class createLikes1616745705397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'likes',
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
          name: 'postId',
          type: 'int',
        },
      ],
    }), true);

    await queryRunner.createForeignKey('likes', new TableForeignKey({
      columnNames: ['postId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'posts',
      onDelete: 'CASCADE',
    }));
    await queryRunner.createForeignKey('likes', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('likes');
  }
}
