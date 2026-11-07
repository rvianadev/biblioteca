package br.dev.rviana.biblioteca.repository;

import br.dev.rviana.biblioteca.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {

}
