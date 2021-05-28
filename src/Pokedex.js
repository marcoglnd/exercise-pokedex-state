import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pokeIndex: 0,
            filteredPokemon: props.pokemons.filter((pokemon) => pokemon.type === 'Fire'),
            disabledButton: false
        }
        this.changePokemon = this.changePokemon.bind(this)
        this.filterPokemon = this.filterPokemon.bind(this)
        this.allPokemons = this.allPokemons.bind(this)
    }

    changePokemon() {
        this.setState((currentState) => ({
            pokeIndex: currentState.pokeIndex + 1
        }))
        if (this.state.pokeIndex === this.state.filteredPokemon.length - 1) {
            this.setState((_currentState, _props) => ({
                pokeIndex: 0
            }))
        }
        if (this.state.filteredPokemon.length === 1) {
            this.setState((currentState) => {
                disabledButton: true
            })
        } else {
            this.setState((currentState) => {
                disabledButton: false
            })
        }
    }

    filterPokemon(type) {
        this.setState((currentState) => ({
            filteredPokemon: this.props.pokemons.filter((pokemon) => pokemon.type === type),
            pokeIndex: 0
        }))
    }

    allPokemons() {
        this.setState((currentState) => ({
            filteredPokemon: this.props.pokemons,
            pokeIndex: 0
        }))
    }

    render() {
        const pokemonTypes = this.props.pokemons.reduce((acc, curr) => acc.includes(curr.type) ? acc : acc.concat(curr.type)
        , [])

        return (
            <div className="pokedex">
                <Pokemon pokemon={this.state.filteredPokemon[this.state.pokeIndex]} />
                <button disabled={this.state.disabledButton} onClick={this.changePokemon}>Próximo pokemon</button>
                {pokemonTypes.map((type) => <button onClick={() => this.filterPokemon(type)}>{type}</button>)}
                <button onClick={this.allPokemons}>All</button>
            </div>
        );
    }
}

export default Pokedex;