
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('visitors')
export class Visitor {

  @PrimaryGeneratedColumn({ name: 'serial_no' })
  serialNo: number

  @Column({ name: 'visit_date', type: 'date', nullable: true })
  visitDate: string

  @Column({ name: 'first_name', length: 50, nullable: true })
  firstName: string

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName: string

  @Column({ length: 10, nullable: true })
  mobile: string

  @Column({ name: 'vehicle_number', length: 30, nullable: true })
  vehicleNumber: string

  @Column({ length: 100, nullable: true })
  purpose: string

  // Visitor Details
  @Column({ name: 'time_in', type: 'time', nullable: true })
  timeIn: string

  @Column({ name: 'time_out', type: 'time', nullable: true })
  timeOut: string

  // Tenant Details
  @Column({ name: 'tenant_name', length: 100, nullable: true })
  tenantName: string

  @Column({ name: 'tenant_mobile', length: 10, nullable: true })
  tenantMobile: string

  @Column({ name: 'flat_number', length: 20, nullable: true })
  flatNumber: string

  @Column({ name: 'tenant_address', length: 255, nullable: true })
  tenantAddress: string

}

