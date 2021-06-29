"""empty message

Revision ID: 205c6093b17b
Revises: ffdc0a98111c
Create Date: 2021-06-29 18:29:00.334280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '205c6093b17b'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pairings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pizza', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('release_date', sa.String(), nullable=True),
    sa.Column('genre', sa.String(), nullable=True),
    sa.Column('plot', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('pairing_id', sa.Integer(), nullable=True),
    sa.Column('good', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['pairing_id'], ['pairings.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('pairings')
    # ### end Alembic commands ###
