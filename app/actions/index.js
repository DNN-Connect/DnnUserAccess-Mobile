import * as RoleActions from './roles';
import * as SiteActions from './sites';
import * as UserActions from './users';

export const ActionCreators = Object.assign({},
    RoleActions,
    SiteActions,
    UserActions
);
