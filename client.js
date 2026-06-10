console.clear();
const base = "http://localhost:3000";

const functions = {
  async getProduct() {
    const res = await fetch(base + "/products/notebook");
    const body = await res.json();
    console.table(body);
  },
};

functions[process.argv[2]]();
