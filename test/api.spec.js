const request = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate.js");

truncate.component();
truncate.product();
truncate.supplier();
truncate.product_components();
truncate.component_suppliers();

const component = { 
    name: "Pisau", 
    description: "Alat pemotong bahan"
};

const product = { 
    name: "Kue Coklat", 
    quantity: 4
};

const supplier = { 
    name: "Holland", 
    address: "Jl. Jend. Sudirman Kav. 5"
};

const product_components = { 
    id_product: 1, 
    id_component: 1
};

const component_suppliers = { 
    id_component: 1, 
    id_supplier: 1
};

describe("component.store function", () => {
    // Positif Case
    test("Mendaftarkan component yang belum terdaftar", async () => {
      try {
        const res = await request(app).post('/components').send({
          name: component.name,
          description: component.description
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("description");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan component yang tidak memiliki nama", async () => {
      try {
        const res = await request(app).post('/components').send({
          description: component.description
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name is required!");
      
    } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan component yang tidak memiliki deskripsi", async () => {
      try {
        const res = await request(app).post('/components').send({
          name: component.name
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("description is required!");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
  
  describe("component.update function", () => {
    // Positif Case
    test("Meng-update nama atau deskripsi sesuai dengan id_component dengan benar", async () => {
      try {
          const id = 1;
          const res = await request(app).put(`/components/${id}`).send({
          name: component.name,
          description: component.description
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
  
      } catch (error) {
        expect(error).toBe("error");
      }
    });
  
    // Negatif Case
    test("Meng-update nama atau deskripsi dengan id_component yang salah", async () => {
      try {
          const id = 1000;
          const res = await request(app).put(`/components/${id}`).send({
          name: component.name,
          description: component.description
        });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(`can't find component with id ${id}!`);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

describe("product.store function", () => {
  // Positif Case
  test("Mendaftarkan produk yang belum terdaftar", async () => {
    try {
      const res = await request(app).post('/products').send({
        name: product.name,
        quantity: product.quantity
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("quantity");
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  // Negatif Case
  test("Mendaftarkan product yang tidak memiliki nama", async () => {
    try {
      const res = await request(app).post('/products').send({
        quantity: product.quantity
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("name is required!");
    } catch (err) {
      expect(err).toBe("error");
    }
  });

  // Negatif Case
  test("Mendaftarkan product yang tidak memiliki kuantitas", async () => {
    try {
      const res = await request(app).post('/products').send({
        name: product.name
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("quantity is required!");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("product.update function", () => {
  // Positif Case
  test("Meng-update nama atau kuantitas sesuai dengan id_product dengan benar", async () => {
    try {
        const id = 1;
        const res = await request(app).put(`/products/${id}`).send({
        name: product.name,
        quantity: product.quantity
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success!");

    } catch (error) {
      expect(error).toBe("error");
    }
  });

  // Negatif Case
  test("Meng-update nama atau kuantitas dengan id_product yang salah", async () => {
    try {
        const id = 1000;
        const res = await request(app).put(`/products/${id}`).send({
        name: product.name,
        quantity: product.quantity
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`can't find product with id ${id}!`);
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

describe("supplier.store function", () => {
    // Positif Case
    test("Mendaftarkan supplier yang belum terdaftar", async () => {
      try {
        const res = await request(app).post('/suppliers').send({
          name: supplier.name,
          address: supplier.address
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("address");
      
    } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan supplier yang tidak memiliki nama", async () => {
      try {
        const res = await request(app).post('/suppliers').send({
          address: product.address
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name is required!");
      
    } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan supplier yang tidak memiliki alamat", async () => {
      try {
        const res = await request(app).post('/suppliers').send({
          name: supplier.name
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("address is required!");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
  
  describe("supplier.update function", () => {
    // Positif Case
    test("Meng-update nama atau alamat sesuai dengan id_supplier dengan benar", async () => {
      try {
          const id = 1;
          const res = await request(app).put(`/suppliers/${id}`).send({
          name: supplier.name,
          address: supplier.address
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
  
      } catch (error) {
        expect(error).toBe("error");
      }
    });
  
    // Negatif Case
    test("Meng-update nama atau alamat dengan id_supplier yang salah", async () => {
      try {
          const id = 1000;
          const res = await request(app).put(`/suppliers/${id}`).send({
          name: supplier.name,
          address: supplier.address
        });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(`can't find supplier with id ${id}!`);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("product_components.store function", () => {
    // Positif Case
    test("Mendaftarkan product_components yang belum terdaftar", async () => {
      try {
        const res = await request(app).post('/product-components').send({
          id_product: product_components.id_product,
          id_component: product_components.id_component
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("id_product");
        expect(res.body.data).toHaveProperty("id_component");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan product_components yang tidak memiliki id_product", async () => {
      try {
        const res = await request(app).post('/product-components').send({
          id_component: product_components.id_component
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_product is required!");
      
    } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan product_components yang tidak memiliki id_component", async () => {
      try {
        const res = await request(app).post('/product-components').send({
          id_product: product_components.id_product
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_component is required!");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
  
  describe("product_components.update function", () => {
    // Positif Case
    test("Meng-update id_product atau id_component sesuai dengan id_product_components dengan benar", async () => {
      try {
          const id = 1;
          const res = await request(app).put(`/product-components/${id}`).send({
          id_product: product_components.id_product,
          id_component: product_components.id_component
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
  
      } catch (error) {
        expect(error).toBe("error");
      }
    });
  
    // Negatif Case
    test("Meng-update id_product atau id_component dengan id_product_components yang salah", async () => {
      try {
          const id = 1000;
          const res = await request(app).put(`/product-components/${id}`).send({
          id_product: product_components.id_product,
          id_component: product_components.id_component
        });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(`can't find product_component with id ${id}!`);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });

  describe("component_suppliers.store function", () => {
    // Positif Case
    test("Mendaftarkan component_suppliers yang belum terdaftar", async () => {
      try {
        const res = await request(app).post('/component-suppliers').send({
          id_component: component_suppliers.id_component,
          id_supplier: component_suppliers.id_supplier
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("id_component");
        expect(res.body.data).toHaveProperty("id_supplier");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan component_suppliers yang tidak memiliki id_component", async () => {
      try {
        const res = await request(app).post('/component-suppliers').send({
          id_supplier: component_suppliers.id_supplier
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_component is required!");
      
    } catch (err) {
        expect(err).toBe("error");
      }
    });
  
    // Negatif Case
    test("Mendaftarkan component_suppliers yang tidak memiliki id_supplier", async () => {
      try {
        const res = await request(app).post('/component-suppliers').send({
          id_component: component_suppliers.id_component
        });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("id_supplier is required!");
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
  
  describe("component_suppliers.update function", () => {
    // Positif Case
    test("Meng-update id_component atau id_supplier sesuai id_component_suppliers dengan benar", async () => {
      try {
          const id = 1;
          const res = await request(app).put(`/component-suppliers/${id}`).send({
          id_component: component_suppliers.id_component,
          id_supplier: component_suppliers.id_supplier
        });
  
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");
  
      } catch (error) {
        expect(error).toBe("error");
      }
    });
  
    // Negatif Case
    test("Meng-update id_component atau id_supplier dengan id_component_suppliers yang salah", async () => {
      try {
          const id = 1000;
          const res = await request(app).put(`/component-suppliers/${id}`).send({
          id_component: component_suppliers.id_component,
          id_supplier: component_suppliers.id_supplier
        });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe(`can't find component_suppliers with id ${id}!`);
      } catch (err) {
        expect(err).toBe("error");
      }
    });
  });
