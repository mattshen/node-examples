
process.on("uncaughtException", function (err) {
    console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    //process.exit(1);
})

async function f1() {
    throw "fdafds"
}

(function loop(){
    setTimeout(async () => {
        //try {
            console.log('doing something');
            await f1();
        //} catch (e) {
            console.error(e);
        //}
        loop();
    }, 1000);
})();


