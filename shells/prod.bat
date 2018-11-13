call cd ..
call npm run pre-build -- --conf=prod
call npm run build
call npm run post-build -- --conf=prod