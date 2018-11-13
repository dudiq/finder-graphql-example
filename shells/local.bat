call cd ..
call npm run pre-build -- --conf=local
call npm run build
call npm run post-build -- --conf=local