"""empty message

Revision ID: 59093e97f8c0
Revises: 205c6093b17b
Create Date: 2021-06-30 22:13:29.938185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '59093e97f8c0'
down_revision = '205c6093b17b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pairings', sa.Column('poster', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pairings', 'poster')
    # ### end Alembic commands ###
