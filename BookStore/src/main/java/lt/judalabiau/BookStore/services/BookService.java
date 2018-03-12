package lt.judalabiau.BookStore.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.judalabiau.BookStore.models.Book;
import lt.judalabiau.BookStore.repositories.BookRepository;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	@Transactional
	public List<Book> getBook() {
		return bookRepository.findAll();
	}

	@Transactional
	public void cretaeBook(Book book) {
		bookRepository.save(book);
	}

	@Transactional
	public void deleteBook(Long id) {
		bookRepository.deleteById(id);
	}

	@Transactional
	public void updateBook(Long id, Book book) {
		bookRepository.save(book);
	}
}
