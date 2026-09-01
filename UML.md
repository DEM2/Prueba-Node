classDiagram

class User {
  +number id
  +string name
  +string email
  -string password
  +Role role
}

class Clinic {
  +number id
  +string name
  +string address
  +boolean isDeleted
}

class Medicine {
  +number id
  +string name
  +string description
  +number stock
  +boolean isDeleted
}

class Warehouse {
  +number id
  +string name
  +string address
  +boolean isDeleted
}

class Request {
  +number id
  +number clinicId
  +number medicineId
  +number warehouseId
  +number requestedByUserId
  +number quantity
  +RequestStatus status
  +string notes
  +boolean isDeleted
}

User "1" --> "0..*" Request : realiza
Clinic "1" --> "0..*" Request : recibe
Medicine "1" --> "0..*" Request : solicita
Warehouse "1" --> "0..*" Request : abastece
