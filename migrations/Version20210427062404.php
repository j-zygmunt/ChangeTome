<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210427062404 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE ad_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE address_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE messages_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE photo_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reviews_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ad (id INT NOT NULL, creator_id INT NOT NULL, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, condition DOUBLE PRECISION NOT NULL, price DOUBLE PRECISION NOT NULL, description VARCHAR(5000) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_77E0ED5861220EA6 ON ad (creator_id)');
        $this->addSql('CREATE TABLE address (id INT NOT NULL, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE messages (id INT NOT NULL, ad_id INT NOT NULL, sender_id INT NOT NULL, reciever_id INT NOT NULL, message VARCHAR(2000) NOT NULL, sent_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DB021E964F34D596 ON messages (ad_id)');
        $this->addSql('CREATE INDEX IDX_DB021E96F624B39D ON messages (sender_id)');
        $this->addSql('CREATE INDEX IDX_DB021E965D5C928D ON messages (reciever_id)');
        $this->addSql('CREATE TABLE photo (id INT NOT NULL, id_ad_id INT NOT NULL, name VARCHAR(255) NOT NULL, uploaded_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_14B784185E237E06 ON photo (name)');
        $this->addSql('CREATE INDEX IDX_14B78418A1B194A6 ON photo (id_ad_id)');
        $this->addSql('CREATE TABLE reviews (id INT NOT NULL, ad_id INT NOT NULL, reviewer_id INT NOT NULL, reviewee_id INT NOT NULL, message VARCHAR(2000) NOT NULL, rating DOUBLE PRECISION NOT NULL, reviewed_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_6970EB0F4F34D596 ON reviews (ad_id)');
        $this->addSql('CREATE INDEX IDX_6970EB0F70574616 ON reviews (reviewer_id)');
        $this->addSql('CREATE INDEX IDX_6970EB0FBD992930 ON reviews (reviewee_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, id_address_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, is_active BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, phone VARCHAR(20) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649444F97DD ON "user" (phone)');
        $this->addSql('CREATE INDEX IDX_8D93D649503D2FA2 ON "user" (id_address_id)');
        $this->addSql('CREATE TABLE user_ad (user_id INT NOT NULL, ad_id INT NOT NULL, PRIMARY KEY(user_id, ad_id))');
        $this->addSql('CREATE INDEX IDX_6FB7599DA76ED395 ON user_ad (user_id)');
        $this->addSql('CREATE INDEX IDX_6FB7599D4F34D596 ON user_ad (ad_id)');
        $this->addSql('ALTER TABLE ad ADD CONSTRAINT FK_77E0ED5861220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E964F34D596 FOREIGN KEY (ad_id) REFERENCES ad (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96F624B39D FOREIGN KEY (sender_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E965D5C928D FOREIGN KEY (reciever_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE photo ADD CONSTRAINT FK_14B78418A1B194A6 FOREIGN KEY (id_ad_id) REFERENCES ad (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0F4F34D596 FOREIGN KEY (ad_id) REFERENCES ad (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0F70574616 FOREIGN KEY (reviewer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reviews ADD CONSTRAINT FK_6970EB0FBD992930 FOREIGN KEY (reviewee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649503D2FA2 FOREIGN KEY (id_address_id) REFERENCES address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_ad ADD CONSTRAINT FK_6FB7599DA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_ad ADD CONSTRAINT FK_6FB7599D4F34D596 FOREIGN KEY (ad_id) REFERENCES ad (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE messages DROP CONSTRAINT FK_DB021E964F34D596');
        $this->addSql('ALTER TABLE photo DROP CONSTRAINT FK_14B78418A1B194A6');
        $this->addSql('ALTER TABLE reviews DROP CONSTRAINT FK_6970EB0F4F34D596');
        $this->addSql('ALTER TABLE user_ad DROP CONSTRAINT FK_6FB7599D4F34D596');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649503D2FA2');
        $this->addSql('ALTER TABLE ad DROP CONSTRAINT FK_77E0ED5861220EA6');
        $this->addSql('ALTER TABLE messages DROP CONSTRAINT FK_DB021E96F624B39D');
        $this->addSql('ALTER TABLE messages DROP CONSTRAINT FK_DB021E965D5C928D');
        $this->addSql('ALTER TABLE reviews DROP CONSTRAINT FK_6970EB0F70574616');
        $this->addSql('ALTER TABLE reviews DROP CONSTRAINT FK_6970EB0FBD992930');
        $this->addSql('ALTER TABLE user_ad DROP CONSTRAINT FK_6FB7599DA76ED395');
        $this->addSql('DROP SEQUENCE ad_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE address_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE messages_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE photo_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reviews_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('DROP TABLE ad');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE photo');
        $this->addSql('DROP TABLE reviews');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE user_ad');
    }
}
