function createPromise() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    })
}


function ass() {
    return createPromise();
}


async function main() {
    console.time("async");

    await ass();

    console.timeEnd("async");
}

console.log(0);
main();
console.log(1);