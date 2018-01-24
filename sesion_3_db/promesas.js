const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("La tarea ha sido resuelta");
        resolve("ok");
    }, 10000);
});

promise.then(() => {
    console.log("La promesa ha sido cumplida");
});