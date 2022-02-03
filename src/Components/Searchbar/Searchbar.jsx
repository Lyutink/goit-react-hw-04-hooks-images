import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import {
  SearchbarConteiner,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from "./Searchbar.styled";

import { ReactComponent as SearchIcon } from "../../icons/search.svg";

export default function Searchbar({ onSubmit }) {
  const [requestFromUser, setRequestFromUser] = useState("");

  const handleChange = (event) => {
    setRequestFromUser(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(requestFromUser);
  };

  return (
    <SearchbarConteiner>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <SearchIcon fill="darkgray" width="24" />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleChange}
          value={requestFromUser}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarConteiner>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
