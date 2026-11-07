package br.dev.rviana.biblioteca.controller;

import br.dev.rviana.biblioteca.model.Livro;
import br.dev.rviana.biblioteca.service.LivroService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @GetMapping
    public List<Livro> listarTodos() {
        return livroService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {

        return livroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Livro> salvar(@Valid @RequestBody Livro livro) {

        Livro livroSalvo = livroService.salvar(livro);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(livroSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Livro livro) {

        return livroService.buscarPorId(id)
                .map(livroExistente -> {
                    livroExistente.setTitulo(livro.getTitulo());
                    livroExistente.setAutor(livro.getAutor());
                    livroExistente.setIsbn(livro.getIsbn());
                    livroExistente.setAnoPublicacao(livro.getAnoPublicacao());

                    Livro atualizado = livroService.salvar(livroExistente);

                    return ResponseEntity.ok(atualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (livroService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        livroService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}
