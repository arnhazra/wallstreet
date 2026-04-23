import { Injectable, OnModuleInit } from "@nestjs/common"
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core"
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper"
import { tool } from "@langchain/core/tools"
import { StructuredTool } from "@langchain/core/tools"
import { AGENT_TOOL_METADATA_KEY, AgentToolOptions } from "./agent.decorator"

@Injectable()
export class AgentRegistryService implements OnModuleInit {
  private tools: StructuredTool[] = []

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector
  ) {}

  onModuleInit() {
    this.tools = this.discoverTools()
  }

  getTools(): StructuredTool[] {
    return this.tools
  }

  private discoverTools(): StructuredTool[] {
    const discovered: StructuredTool[] = []

    const providers: InstanceWrapper[] = [
      ...this.discovery.getProviders(),
      ...this.discovery.getControllers(),
    ]

    for (const wrapper of providers) {
      const { instance } = wrapper

      if (!instance || typeof instance !== "object") {
        continue
      }

      const prototype = Object.getPrototypeOf(instance)

      this.metadataScanner.scanFromPrototype(
        instance,
        prototype,
        (methodName: string) => {
          const methodRef = prototype[methodName]

          const options = this.reflector.get<AgentToolOptions>(
            AGENT_TOOL_METADATA_KEY,
            methodRef
          )

          if (!options) return

          const langchainTool = this.buildTool(options, instance, methodName)
          discovered.push(langchainTool)
        }
      )
    }

    return discovered
  }

  private buildTool(
    options: AgentToolOptions,
    instance: object,
    methodName: string
  ): StructuredTool {
    return tool(
      async (input: unknown) => {
        try {
          const result = await (instance as Record<string, Function>)[
            methodName
          ](input)
          return {
            success: true,
            data: result,
            error: null,
          }
        } catch (error) {
          return {
            success: false,
            data: null,
            error: error?.message ?? `Tool ${options.name} failed`,
          }
        }
      },
      {
        name: options.name,
        description: options.description,
        schema: options.schema,
      }
    )
  }
}
