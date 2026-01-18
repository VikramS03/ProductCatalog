package com.example.productCatalog.service;

import com.example.productCatalog.model.Product;
import com.example.productCatalog.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final String uploadDir = "C:/Users/304491/Desktop/spring and spring boot/Ecommerce/productCatalog/uploads/";

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // CREATE PRODUCT
    public Product createProduct(Product product, MultipartFile image) throws IOException {

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File file = new File(uploadDir + fileName);
            file.getParentFile().mkdirs();
            image.transferTo(file);
            product.setImageUrl("/uploads/" + fileName);
        }

        product.setStatus(product.getStock() > 0);
        return productRepository.save(product);
    }

    // UPDATE PRODUCT
    public Product updateProduct(Long id, Product product, MultipartFile image) throws IOException {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setStatus(product.getStock() > 0);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File file = new File(uploadDir + fileName);
            file.getParentFile().mkdirs();
            image.transferTo(file);
            existingProduct.setImageUrl("/uploads/" + fileName);
        }

        return productRepository.save(existingProduct);
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // GET ALL PRODUCTS (ADMIN)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET ACTIVE PRODUCTS (USER)
    public List<Product> getActiveProducts() {
        return productRepository.findByStatusTrue();
    }

    // GET PRODUCT BY ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
