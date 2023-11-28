package com.projects.aluminumdesign.service;

import com.projects.aluminumdesign.controller.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Yeison Perea
 */

public interface QuoteRepository extends JpaRepository<Quote, Long>{
    
}
