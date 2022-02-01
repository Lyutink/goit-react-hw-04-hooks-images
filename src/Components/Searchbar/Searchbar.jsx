import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  SearchbarConteiner,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from "./Searchbar.styled";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";

class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    requestFromUser: "",
  };

  handleChange = (event) => {
    this.setState({ requestFromUser: event.currentTarget.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <SearchbarConteiner>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            <SearchIcon fill="darkgray" width="24" />
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleChange}
            value={this.state.requestFromUser}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarConteiner>
    );
  }
}
export default Searchbar;
