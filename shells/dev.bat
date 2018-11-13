call cd ..
call npm run pre-build -- --conf=dev
call npm run build
call npm run post-build -- --conf=dev