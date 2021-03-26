import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createLikes1616745705397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'Likes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'postID',
          type: 'int',
        },
        {
          name: 'userID',
          type: 'int',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Likes');
  }
}
