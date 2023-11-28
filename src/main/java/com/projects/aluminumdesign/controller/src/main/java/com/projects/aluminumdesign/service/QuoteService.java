package com.projects.aluminumdesign.service;

import com.projects.aluminumdesign.controller.model.Quote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Yeison Perea
 */
@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;

    @Autowired
    public QuoteService(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }
    
     public Quote save(Quote quote) {
        return quoteRepository.save(quote);
    }
}
