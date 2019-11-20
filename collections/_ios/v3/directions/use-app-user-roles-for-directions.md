---
layout: tutorial
title: Use App User Roles for Directions
parent: directions
nav_weight: 10000
date: 2019-09-30
published:true
last_modified_at: 2019-09-30
---

An indoor route network can be configured so that a given user role has access to directions in a given area.

The list of available user roles can be retrieved from the `MPSolutionProvider`:

```swift
MPSolutionProvider.init().getUserRoles { (userRoles, error) in
    let role = userRoles.first            
}
```

To use the roles, assign one or more roles to the `MPDirectionsQuery` object:

```swift

let directionsQuery = MPDirectionsQuery.init(originPoint: origin!, destination: destination!)
directionsQuery.userRoles = [userRole]

directionsService.routing(with: directionsQuery) { (myRestrictedRoute, error) in
    
}

```
