

function sync(n) {
    console.log("sync function", n)
}

async function notsync(n) {
    console.log("started async call ", n)

    await new Promise(function (resolve) {
        setTimeout(() => {
            resolve()
        }, Math.random() * 1)
    })

    console.log("async function", n)

    return n
}

async function app() {
    Promise.all([
        notsync(1),
        notsync(2),
        notsync(3),
        notsync(4),
    ]).then(results => {
        console.log(results)
    })

    sync(1)
    sync(2)
    sync(3)
    sync(4)
}

app()

const a = [1,2,3,4];
[a[0], a[2]] = [a[2], a[0]];
console.log(a);
