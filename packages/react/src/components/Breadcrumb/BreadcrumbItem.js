/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Link from '../Link';
import { OverflowMenuHorizontal } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(
  {
    'aria-current': ariaCurrent,
    children,
    className: customClassName,
    href,
    isCurrentPage,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--breadcrumb-item`]: true,
    // We set the current class only if `isCurrentPage` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--breadcrumb-item--current`]:
      isCurrentPage && ariaCurrent !== 'page',
    [customClassName]: !!customClassName,
  });

  if (
    children.type &&
    children.type.displayName !== undefined &&
    children.type.displayName.includes('OverflowMenu')
  ) {
    const horizontalOverflowIcon = (
      <OverflowMenuHorizontal className={`${prefix}--overflow-menu__icon`} />
    );
    return (
      <li className={className} {...rest}>
        {React.cloneElement(children, {
          menuOptionsClass: `${prefix}--breadcrumb-menu-options`,
          menuOffset: { top: 10, left: 59 },
          renderIcon: () => horizontalOverflowIcon,
        })}
      </li>
    );
  }

  if (typeof children === 'string') {
    return (
      <li className={className} ref={ref} {...rest}>
        {href ? (
          <Link href={href} aria-current={ariaCurrent}>
            {children}
          </Link>
        ) : (
          <Text className={`${prefix}--link`}>{children}</Text>
        )}
      </li>
    );
  }

  return (
    <li className={className} ref={ref} {...rest}>
      {React.cloneElement(children, {
        'aria-current': ariaCurrent,
        className: cx(`${prefix}--link`, children.props.className),
      })}
    </li>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  'aria-current': PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,

  /**
   * Provide if this breadcrumb item represents the current page
   */
  isCurrentPage: PropTypes.bool,
};

export default BreadcrumbItem;
