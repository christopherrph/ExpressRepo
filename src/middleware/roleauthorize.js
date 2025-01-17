const roles = require('../config/roles');
//RBAC Role Based Access Control

const roleAuthorize = (requiredRoles) => {
    return (req, res, next) => {
        // const userRole = req.headers['role']; // Assume role is stored in the headers
        const userRole = req.decoded.role; // Assume role is stored in the decoded token
        console.log("User Role: " + userRole);


        if (!userRole || !roles[userRole]) { // Check if user role is valid and exist
          return res.status(403).json({ message: 'Access denied. Role not found.' });
        }
    
        // Check if user has one of the required roles
        const hasPermission = requiredRoles.some((requiredRole) => roles[userRole].can.includes(requiredRole));
    
        if (!hasPermission) {
          return res.status(403).json({ message: `${userRole} Access denied. Insufficient permissions.` });
        }
    
        next(); // User has the necessary permission
    }
}

module.exports = roleAuthorize;