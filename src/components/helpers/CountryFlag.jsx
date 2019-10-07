import React from 'react';

function CountryFlag(props) {
    const { country } = props;
    return (
        <span role="img" aria-label='country-flag'>
            {(country === 'DOMINICAN_REPUBLIC')
                ? <i className="em em-flag-do"></i> : (country === 'VENEZUELA')
                    ? <i className="em em-flag-ve"></i> : (country === 'PERU')
                        ? <i className="em em-flag-pe"></i> : (country === 'USA')
                            ? <i className="em em-flag-us"></i> : ''
            }
        </span>
    )
}

export default CountryFlag