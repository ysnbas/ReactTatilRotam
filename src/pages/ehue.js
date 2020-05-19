import React, {Component} from 'react';

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to
// keep file size down
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector';
import {View, Text} from 'react-native-animatable';

export default class ehue extends Component {
  constructor(props) {
    super(props);
    this.state = {country: '', region: ''};
  }

  selectCountry(val) {
    this.setState({country: val});
  }

  selectRegion(val) {
    this.setState({region: val});
  }

  render() {
    const {country, region} = this.state;
    return (
      <Text>
        <CountryDropdown
          value={country}
          onChange={val => this.selectCountry(val)}
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={val => this.selectRegion(val)}
        />
      </Text>
    );
  }
}
