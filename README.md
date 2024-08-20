# Steps to run application
1. open -a docker
2. docker-compose up
3. npm install
4. npx prisma migrate reset
5. npx prisma db push
6. npx tsx prisma/seed/notification-type
7. npx tsx prisma/seed/users