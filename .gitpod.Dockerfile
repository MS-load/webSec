FROM gitpod/workspace-full

# Install PostgreSQL
RUN sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib

# Set up PostgreSQL
USER postgres
RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER gitpod WITH SUPERUSER PASSWORD 'gitpod';" &&\
    createdb -O gitpod mydatabase

# Add your SQL script
COPY create_table.sql /docker-entrypoint-initdb.d/

USER gitpod
