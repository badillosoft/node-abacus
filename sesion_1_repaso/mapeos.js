const a = [1, 2, 4, 8, 3, 2];

function T(x) {
    return x * x;
}

const b = a.map(T);

const c = a.map(function(x) {
    return x * x;
});

const d = a.map((x) => {
    return x * x;
});

const e = a.map((x) => x * x);

const f = a.map(x => x * x);