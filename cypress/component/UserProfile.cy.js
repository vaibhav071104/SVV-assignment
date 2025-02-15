// cypress/component/UserProfile.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import UserProfile from '../../src/Components/UserProfile/UserProfile';

describe('UserProfile.cy.js', () => {

  beforeEach(function () {
    // Load the fixture data before each test and log it
    cy.fixture('example.json').as('userData').then(function (data) {
      console.log('Loaded fixture data:', data);
      this.userData = data; // Explicitly assign data to this.userData
    });
  });

  it('should render the user profile with user information', function () {
    // Log the fixture data to verify it is loaded correctly
    console.log('Using fixture data:', this.userData);

    // Use the fixture data from example.json
    mount(<UserProfile user={this.userData.user} />);

    cy.get('.profile-picture')
      .should('have.attr', 'src', this.userData.user.profilePicture)
      .and('have.attr', 'alt', `${this.userData.user.name}'s profile`)
      .then(($img) => {
        console.log('Profile picture attributes:', $img.attr('src'), $img.attr('alt'));
      });

    cy.contains(this.userData.user.name).should('be.visible');
    cy.contains(this.userData.user.email).should('be.visible');
    cy.contains('Follow').should('be.visible');
  });

  it('should toggle follow/unfollow state when button is clicked', function () {
    mount(<UserProfile user={this.userData.user} />);

    cy.contains('Follow').should('be.visible').click();

    cy.contains('Unfollow').should('be.visible').then(() => {
      console.log('Unfollow button is visible');
    });
    cy.contains(`You are following ${this.userData.user.name}.`).should('be.visible');

    cy.contains('Unfollow').click();
    cy.contains('Follow').should('be.visible').then(() => {
      console.log('Follow button is visible');
    });
    cy.contains(`You are following ${this.userData.user.name}.`).should('not.exist');
  });

  it('should not show follow message initially', function () {
    mount(<UserProfile user={this.userData.user} />);

    cy.contains(`You are following ${this.userData.user.name}.`).should('not.exist');
  });
});
