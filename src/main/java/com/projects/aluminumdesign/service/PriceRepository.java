package com.projects.aluminumdesign.service;

import com.projects.aluminumdesign.controller.model.Price;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, Long> {
    // Puedes agregar métodos de consulta personalizados si es necesario
     List<Price> findByProductName(String productName);
}
